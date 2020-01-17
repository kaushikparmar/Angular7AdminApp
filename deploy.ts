import * as shell from 'shelljs';


if (!shell.which('git')) {
    shell.echo('GitBash is not installed. It is mandatory to deploy the build');
    shell.exit(1);
}

shell.exec('ssh petboox@10.50.250.14');


