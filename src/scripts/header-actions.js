import { auth } from './auth';
import { refs } from './global-refs';

auth.subscribe(({ isSignedIn, user }) => {
  if (!isSignedIn) {
    refs.headerActions.createBtn.hidden = true;
    refs.headerActions.homework.hidden = true;
    return;
  }

  const isAdmin = auth.isAdmin(user);

  if (isAdmin) {
    refs.headerActions.createBtn.hidden = false;
    refs.headerActions.homework.hidden = true;
  } else {
    refs.headerActions.createBtn.hidden = true;
    refs.headerActions.homework.hidden = false;
  }
});
