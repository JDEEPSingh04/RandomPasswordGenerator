const yargs = require('yargs');
const crypto = require('crypto');

const argv = yargs
  .usage('Usage: $0 [options]')
  .option('length', {
    alias: 'l',
    type: 'number',
    description: 'Length of the password',
    default: 12,
  })
  .option('numbers', {
    alias: 'n',
    type: 'boolean',
    description: 'Include numbers',
    default: true,
  })
  .option('symbols', {
    alias: 's',
    type: 'boolean',
    description: 'Include symbols',
    default: true,
  })
  .help('help')
  .alias('help', 'h')
  .epilog('Enjoy your new password!')
  .argv;

const generatePassword = (length, numbers, symbols) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let charset = chars;
  if (numbers) {
    charset += '0123456789';
  }
  if (symbols) {
    charset += '!@#$%^&*()_+~`|}{[]\\\:;?><,./-=';
  }
  const randomBytes = crypto.randomBytes(length);
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % charset.length;
    password += charset.charAt(randomIndex);
  }
  return password;
};

const password = generatePassword(argv.length, argv.numbers, argv.symbols);
console.log(password);
