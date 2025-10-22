import Swal from "sweetalert2";

// Cannot join modal
export const cannotJoinSwal = () => {
    Swal.fire({
        icon: "error",
        title: "Cannot Join",
        text: "You can no longer join this challenge. The start date has passed.",
        customClass: {
            popup: "rounded-xl font-sans", // smooth rounded corners & font
            title: "text-[var(--text-color-all)] font-[var(--font-heading)] text-lg",
            content: "text-[var(--text-color-all)] text-base",
            confirmButton: "bg-[var(--color-primary)] text-[var(--color-white)] px-6 py-2 rounded-lg hover:opacity-90"
        },
        buttonsStyling: false,
    });
};

// Successful join modal
export const successfulJoinSwal = () => {
    Swal.fire({
        icon: "success",
        title: "Joined!",
        text: "You’ve successfully joined the challenge.",
        customClass: {
            popup: "rounded-xl font-sans",
            title: "text-[var(--text-color-all)] font-[var(--font-heading)] text-lg",
            content: "text-[var(--text-color-all)] text-base",
            confirmButton: "bg-[var(--color-primary)] text-[var(--color-white)] px-6 py-2 rounded-lg hover:opacity-90"
        },
        buttonsStyling: false,
    });
};


// login required modal
export const loginRequiredSwal = () => {
    Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to join the challenge.",
        customClass: {
            popup: "rounded-xl font-sans", // smooth corners & font
            title: "text-[var(--text-color-all)] font-[var(--font-heading)] text-lg",
            content: "text-[var(--text-color-all)] text-base",
            confirmButton: "bg-[var(--color-primary)] text-[var(--color-white)] px-6 py-2 rounded-lg hover:opacity-90"
        },
        buttonsStyling: false
    });
};



export const alreadyJoinedSwal = () => {
  Swal.fire({
    icon: "warning",
    title: "Already Joined",
    text: "You have already joined this challenge.",
    customClass: {
      popup: "rounded-xl font-sans", // smooth corners & font
      title: "text-[var(--text-color-all)] font-[var(--font-heading)] text-lg",
      content: "text-[var(--text-color-all)] text-base",
      confirmButton: "bg-[var(--color-primary)] text-[var(--color-white)] px-6 py-2 rounded-lg hover:opacity-90"
    },
    buttonsStyling: false
  });
};
