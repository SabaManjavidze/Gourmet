// Type declaration for fbq (Meta Pixel)
declare global {
  interface Window {
    fbq: (
      type: "track" | "trackCustom" | "init",
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export const trackMetaEvent = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, params);
  }
};

// Standard Meta Pixel events
export const trackLead = (params?: {
  content_name?: string;
  value?: number;
}) => {
  trackMetaEvent("Lead", params);
};

export const trackCompleteRegistration = (params?: {
  content_name?: string;
}) => {
  trackMetaEvent("CompleteRegistration", params);
};

// Custom events for Gourmet
export const trackConsultationRequest = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "ConsultationRequest");
  }
};

export const trackMenuSave = (menuName: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", "MenuSave", { menu_name: menuName });
  }
};
