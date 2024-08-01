export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <hgroup style={{ textAlign: "left", marginTop: "2rem" }}>
      <h1>{title}</h1>
      <p style={{fontSize: "14px", marginTop: "0.5rem"}}>{description}</p>
    </hgroup>
  );
}
