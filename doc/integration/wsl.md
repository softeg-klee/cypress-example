# WSL 2
In order to launch cypress UI from wsl 2, you need to set-up a the DISPLAY IP environment variable.

1. You can configure it with the command :
```bash
yarn init-wsl
```


2. Once done, you have to set-up a window X-server program, such as [vcxsrv](https://sourceforge.net/projects/vcxsrv/).
For more information, please refer to https://nickymeuleman.netlify.app/blog/gui-on-wsl2-cypress