export const sanitizeHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};


export const truncatedStory = (description) => {
  const maxLength = 100; // A maximális hossz 60 karakter

  // A description szöveg rövidítése és HTML elemek eltávolítása
  const sanitizedDescription = sanitizeHTML(description);

  let truncatedDescription = sanitizedDescription;

  if (sanitizedDescription.length > maxLength) {
    // Megkeressük a legközelebbi szóközt a maxLength után
    const lastSpaceIndex = sanitizedDescription.lastIndexOf(" ", maxLength);

    // Ha van szóköz a maxLength után, akkor ott vágjuk le
    if (lastSpaceIndex !== -1) {
      truncatedDescription =
        sanitizedDescription.substring(0, lastSpaceIndex) + "...";
    } else {
      // Ha nincs szóköz a maxLength után, akkor egyszerűen levágjuk a karaktereket
      truncatedDescription =
        sanitizedDescription.substring(0, maxLength) + "...";
    }
  }
  return truncatedDescription
};
