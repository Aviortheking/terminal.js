```
how it will works

types:
pid = number
style = [key: string]: string

interfaces:
@Package

@Output
    text: string
    classes?: Array<string>
    style?: Array<style>

classes:
!Terminal
    static instance # static instance of terminal
    getRunningCommand(): number
    print(message: string|@Output)
!Process
    kill()
    forceKill()
    static getProcess(pid: number)

folders:
    src/packages/
        get the default export and check if it's a class that inherit from @package
    src/classes/
        internal classes
    srv/interfaces/
        internal interfaces



works
@Package communicate with Terminal/Process
on command input give the command a pid (process id)
```
