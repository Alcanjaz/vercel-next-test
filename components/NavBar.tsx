import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

export default function NavBar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

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
            <button onClick={signOut}>Sign Out</button>
          </li>
          <li />
          <li>
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
