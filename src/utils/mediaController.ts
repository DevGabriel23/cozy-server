// src/utils/mediaController.ts

export function updateMuteBtnUI(btn: HTMLElement, video: HTMLVideoElement) {
	const iconMuted = btn.querySelector(".icon-muted");
	const iconUnmuted = btn.querySelector(".icon-unmuted");
	if (video.muted) {
		iconMuted?.classList.remove("hidden");
		iconUnmuted?.classList.add("hidden");
	} else {
		iconMuted?.classList.add("hidden");
		iconUnmuted?.classList.remove("hidden");
	}
}

export function updateActiveSlideMedia(parent: HTMLElement, container: HTMLElement) {
	const muteBtn = parent.querySelector(".mute-toggle-btn, .audio-btn") as HTMLElement | null;
	const index = Math.round(container.scrollLeft / container.clientWidth);
	const currentElement = container.children[index] as HTMLElement | undefined;
	const videos = container.querySelectorAll("video");

	if (currentElement && currentElement.tagName === "VIDEO") {
		const currentVideo = currentElement as HTMLVideoElement;
		// Silenciar y pausar videos en otros slides del mismo contenedor
		videos.forEach((v) => {
			if (v !== currentVideo) {
				v.muted = true;
				v.pause();
			}
		});

		if (muteBtn) {
			muteBtn.classList.remove("hidden");
			updateMuteBtnUI(muteBtn, currentVideo);
		}
	} else {
		// La diapositiva activa es una imagen o no es un video
		videos.forEach((v) => {
			v.muted = true;
			v.pause();
		});

		if (muteBtn) {
			muteBtn.classList.add("hidden");
		}
	}
}

export function initMediaControllers() {
	// 1. IntersectionObserver global para mutear y pausar videos fuera del viewport
	const videoObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const video = entry.target as HTMLVideoElement;
				const parent = video.closest(".post-card, .extended-dialog") as HTMLElement | null;

				if (!entry.isIntersecting) {
					video.muted = true;
					video.pause();
					if (parent) {
						const muteBtn = parent.querySelector(".mute-toggle-btn, .audio-btn") as HTMLElement | null;
						if (muteBtn) updateMuteBtnUI(muteBtn, video);
					}
				} else {
					video.play().catch(() => {});
				}
			});
		},
		{ threshold: 0.2 }
	);

	document.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
		videoObserver.observe(video);
	});

	const setupContainer = (
		parent: HTMLElement,
		containerSelector: string,
		prevBtnSelector: string,
		nextBtnSelector: string
	) => {
		if (parent.hasAttribute("data-media-init")) return;
		parent.setAttribute("data-media-init", "true");

		const container = parent.querySelector(containerSelector) as HTMLElement | null;
		const nextBtn = parent.querySelector(nextBtnSelector);
		const prevBtn = parent.querySelector(prevBtnSelector);
		const muteBtn = parent.querySelector(".mute-toggle-btn, .audio-btn") as HTMLElement | null;

		if (container) {
			nextBtn?.addEventListener("click", (e) => {
				e.stopPropagation();
				container.scrollBy({ left: container.clientWidth, behavior: "smooth" });
			});

			prevBtn?.addEventListener("click", (e) => {
				e.stopPropagation();
				container.scrollBy({ left: -container.clientWidth, behavior: "smooth" });
			});

			container.addEventListener("scroll", () => {
				updateActiveSlideMedia(parent, container);
			});

			updateActiveSlideMedia(parent, container);
		}

		if (muteBtn && container) {
			muteBtn.addEventListener("click", (e) => {
				e.stopPropagation();
				const index = Math.round(container.scrollLeft / container.clientWidth);
				const currentMedia = container.children[index] as HTMLElement | undefined;
				if (currentMedia && currentMedia.tagName === "VIDEO") {
					const video = currentMedia as HTMLVideoElement;
					video.muted = !video.muted;
					if (!video.muted) {
						video.play().catch(() => {});
					}
					updateMuteBtnUI(muteBtn, video);
				}
			});
		}
	};

	// 2. Controladores para las Tarjetas (.post-card)
	document.querySelectorAll<HTMLElement>(".post-card").forEach((card) => {
		setupContainer(card, ".carousel-container", ".prev-btn", ".next-btn");
	});

	// 3. Controladores para Modales (.extended-dialog)
	document.querySelectorAll<HTMLElement>(".extended-dialog").forEach((dialog) => {
		setupContainer(dialog, ".carousel-container-modal", ".prev-btn-modal", ".next-btn-modal");
	});
}
