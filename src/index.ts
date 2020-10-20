import {Command, flags} from '@oclif/command'
import cypress  from 'cypress'

class Smoketest extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
  }

  static args = [{name: 'spec', required: true}, {name: 'username', required: true}, {name: 'password', required: true}]

  async run() {
    const {args, flags} = this.parse(Smoketest)

    cypress.run({
      reporter: 'junit',
      browser: 'chrome',
      headless: true,
      spec: args.spec,
      config: {
        baseUrl: 'https://example.cypress.io',
        video: false,
      },
      env: {
        username: args.username,
        password: args.password,
      }
    })

  }
}

export = Smoketest
