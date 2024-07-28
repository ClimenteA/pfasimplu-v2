export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <hgroup style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>{title}</h1>
      <p>{description}</p>
    </hgroup>
  );
}
