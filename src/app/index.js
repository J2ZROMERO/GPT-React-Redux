import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

if (typeof window !== 'undefined') {
  import('bootstrap/dist/js/bootstrap.bundle.min.js')
    .then(() => {
      // Bootstrap JavaScript has been successfully loaded
    })
    .catch((error) => {
      console.error('Error loading Bootstrap JavaScript:', error);
    });
}

import '../styles/custom.scss';
