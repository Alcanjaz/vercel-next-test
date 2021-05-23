import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function NavBar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo" type="button">FEED</button>
          </Link>
        </li>
        {username && (
        <>
          <li className="push-left">
            <Link href="/admin">
              <button className="btn-blue" type="button">Write posts</button>
            </Link>
          </li>
          <li>
            <Link href={`/${username}`}>
              <img src={user?.photoURL} alt="Profile page" />
            </Link>
          </li>
        </>
        )}

        {!username && (
        <li>
          <Link href="/enter">
            <button className="btn-blue" type="button">Log in</button>
          </Link>
        </li>
        )}
      </ul>
    </nav>
  );
}
