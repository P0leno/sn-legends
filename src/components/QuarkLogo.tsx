export function QuarkLogo({ size = 20 }: { size?: number }) {
  return (
    <img
      src="./assets/quark/quark-logo.png"
      alt=""
      width={size}
      height={size}
      className="quark-logo-img"
      style={{ width: size, height: size, objectFit: 'contain', opacity: 0.9 }}
      draggable={false}
    />
  );
}
