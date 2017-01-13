const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'client/build', shell: true };
require('child_process').spawn('npm', args, opts);