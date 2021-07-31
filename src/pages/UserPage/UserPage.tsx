import { useContext } from 'react';
import { ThemeContext } from '../../context';
function UserPage() {
  const ctx = useContext(ThemeContext);

  return (
    <div className={ctx.themeColor}>
      <h3>UserPage</h3>
    </div>
  );
}

export default UserPage;