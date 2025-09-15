module.exports = {
  apps: [{
    name: 'projettps-dev',
    script: 'npm',
    args: 'run dev:host',
    env: {
      NODE_ENV: 'development'
    }
  }, {
    name: 'projettps-prod',
    script: 'npm',
    args: 'run preview:host',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
