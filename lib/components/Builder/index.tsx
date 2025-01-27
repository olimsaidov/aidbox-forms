import React from "react";

type Props = React.IframeHTMLAttributes<HTMLIFrameElement> & {
  value: unknown;
  onChange: (value: unknown) => void;
  onSelect?: (item: unknown) => void;
  baseUrl?: string;
  onReady?: () => void;
};

const defaultBaseUrl = "https://form-builder.aidbox.app";

export const Builder = React.forwardRef<HTMLIFrameElement, Props>(
  (props, ref) => {
    const {
      baseUrl,
      value,
      onChange,
      onSelect,
      onReady,
      ...restProps
    } = props;
    const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

    React.useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "from-aidbox-forms/questionnaire") {
          onChange(event.data.data);
        }

        if (event.data.type === "from-aidbox-forms/selected-item") {
          if (onSelect) {
            onSelect(event.data.data);
          }
        }

        if (event.data.type === "from-aidbox-forms/ready") {
          if (onReady) {
            onReady();
          }
          if (iframeRef.current && value) {
            console.log(iframeRef.current.contentWindow);
	    iframeRef.current.contentWindow?.postMessage(
              {
                type: "to-aidbox-forms/questionnaire",
                data: value,
              },
              "*",
            );
          }
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, [onChange, onReady, value]);

    React.useEffect(() => {
      if (iframeRef.current && value) {
        iframeRef.current.contentWindow?.postMessage(
          {
            type: "to-aidbox-forms/questionnaire",
            data: value,
          },
          "*",
        );
      }
    }, [value]);

    return (
      <iframe
        ref={(r) => {
          iframeRef.current = r;
          if (ref) {
            if (typeof ref === "function") {
              ref(r);
            } else {
              ref.current = r;
            }
          }
        }}
        {...restProps}
        src={(baseUrl || defaultBaseUrl) + "/ui/sdc#/forms/builder?f=24058123"}
      />
    );
  },
);
