const path = require('path')
const spawn = require('child_process').spawn

const serve = path.join(__dirname, 'node_modules/serve/bin/serve.js')
const dir = path.join(__dirname, 'files')

const options = {
  auth: true,
  ssl: true,
  clipless: true,
  port: 443,
  cors: process.env.SERVE_CORS === '1',
  treeless: process.env.SERVE_INDEX === '1'
}

const args = [serve]
Object.keys(options).forEach(function (key) {
  if (options[key]) {
    args.push('--' + key)

    if (typeof options[key] !== 'boolean') args.push(options[key])
  }
})
args.push(dir)

process.stdout.write('node ' + args.join(' ') + '\n')

const child = spawn('node', args)

child.stdout.on('data', function (data) {
  process.stdout(String(data))
})

child.stderr.on('data', function (data) {
  throw new Error(String(data))
})

// stop timer
if (process.env.SERVE_DELAY) {
  var delay = parseInt(process.env.SERVE_DELAY)
  delay = isNaN(delay) ? 0 : Math.max(0, delay)

  if (delay > 0) {
    console.log('Serve will stop after ' + delay + 'msec')
    setTimeout(function () {
      child.kill('SIGHUP')
    }, delay * 1000)
  }
}
