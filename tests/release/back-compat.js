const fs = require('fs')
const path = require('path')
const { exec, spawn } = require('child_process')
const git = require('simple-git')()

const majorFolder = 'version-1.0.0'

main()

async function main() {
    const args = process.argv
    if (args.length < 3) {
        console.error('Indicate a file to test. Eg: node tests/release/back-compat.js _layouts/goal.html')
    }
    else {
        if (!fs.existsSync(majorFolder)) {
            await git.clone('https://github.com/open-sdg/open-sdg.git', majorFolder, {
                '--depth': 1,
                '--branch': '1.0.0',
            })
        }
        await testFile(args[2])
    }
}

async function testFile(filePath) {
    await git.checkout(filePath)
    fs.copyFileSync(path.join(majorFolder, filePath), filePath)
    const diff = await git.diff(filePath)
    if (diff === '') {
        await git.checkout(filePath)
    }
    else {
        await runTests(filePath)
    }
}

async function runTests(filePath) {
    const serve = spawn('make', ['serve.detached'])
    serve.on('exit', function (code) {
        console.log('Testing changes to ' + filePath + '...')
        exec('make test.only', (err, stdout, stderr) => {
            if (err) {
                console.log(stdout)
                console.log(err)
                console.error('Failed while testing: ' + filePath + '. See above for errors. Press CTRL-c to stop test.')
            }
            else {
                git.checkout(filePath)
                console.log('...no failures. Press CTRL-c to stop test.')

            }
        })
    });
}
