export default function BlockedPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
        color: "#ff0000",
        fontSize: "5rem",
        textAlign: "center",
        padding: "2rem",
      }}
      className="flex-col"
    >
      ⚠️ YOU ARE NOT ALLOWED TO VISIT THIS SITE ⚠️
      <a href="mailto:priom@priomdeb.com" className="text-orange">
        ⚠️ Contact ⚠️
      </a>
    </div>
  );
}
