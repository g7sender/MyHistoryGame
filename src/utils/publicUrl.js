// עוזר קטן כדי שנתיבי תמונות מתוך public/ יעבדו גם תחת ה-base path של GitHub Pages
// (https://<user>.github.io/MyHistoryGame/) וגם בפיתוח מקומי. לעולם לא לשים "/" בתחילת
// הנתיב בתוכן (JSON) - תמיד יחסי, למשל "images/foo.png".
export function publicUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
