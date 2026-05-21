interface BackLinkProps {
  label: string;
  href: string;
}

export const BackLink: React.FC<BackLinkProps> = ({ label, href }) => {
  return (
    <a href={href} className="text-blue-500 hover:text-blue-700">
      {label}
    </a>
  );
};
