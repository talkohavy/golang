import clsx from 'clsx';
import { Link } from 'react-router-dom';

/**
 * @param {{
 *    children?: string | JSX.Element | JSX.Element[],
 *    to: string,
 *    onClick?: () => void,
 *    onMouseOver?: () => void,
 *    className?: string,
 *    style?: any,
 *    testId?: string,
 * }} props
 */
export default function MyLink({ children, to, onClick, onMouseOver, className, style, testId }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseOver={onMouseOver}
      className={clsx('flex justify-center items-center cursor-pointer', className)}
      style={style}
      data-test-id={`${testId}Link`}
    >
      {children}
    </Link>
  );
}
