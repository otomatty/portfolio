interface BackLinkProps {
  label: string;
  href: string;
}

/**
 * BackLinkコンポーネント
 *
 * @param {BackLinkProps} props - BackLinkコンポーネントのprops
 * @param {string} props.label - リンクのラベル
 * @param {string} props.href - リンクのhref
 * @returns {JSX.Element} BackLinkコンポーネント
 */
export const BackLink: React.FC<BackLinkProps> = ({ label, href }) => {
  return (
    <a href={href} className="text-blue-500 hover:text-blue-700">
      {label}
    </a>
  );
};
