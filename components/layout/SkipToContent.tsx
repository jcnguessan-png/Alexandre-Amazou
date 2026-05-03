export function SkipToContent({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a href={`#${targetId}`} className="skip-link">
      Aller au contenu principal
    </a>
  );
}
