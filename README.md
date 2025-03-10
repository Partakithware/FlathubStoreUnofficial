# FlathubStoreUnofficial
Install and Uninstall Flatpaks via Flathubs Install Button.
I do not often if ever post my applications, so use at your own risk. License: MIT (Subject to Change)
Electron based Flathub store built into a .AppImage for you.

This will allow you to use the flathub store by-itself to install/uninstall flatpackrefs. 

The install button does not change to uninstall once installed. What it does do is attempt to detect the reference via grep and if already installed it will ask if you want to uninstall.
Therefore if something is already installed the terminal that opens will ask if you want to uninstall it. (Yes I could have not made it open a terminal, which then allows more direct installs but less secure)

When you choose to install something it will open a terminal for confirmation of the install/uninstall.

This is at least a step in the direction of flathub as it's own store instead of the site. (I imagine others have already done this but I didn't feel like looking around)

USE AT YOUR OWN RISK. I AM NOT TO BE HELD RESPONSEIBLE FOR ANY DAMAGES THAT MAY OCCUR DUE TO THE USE OF THIS SOFTWARE. 
(I imagine it should be fine of course but idk what you are installing... and if you install something bad somehow that's not on me.)

Otherwise hopefully this is not too trash for your enjoyment! I am not the best coder just wanted to put this out there for others in case they wanted to use it.

Make sure you have preinstalled: 

For Debian/Ubuntu-based systems:
sudo apt install fuse
sudo apt install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak update
sudo apt install gnome-terminal

For Fedora/CentOS-based systems:
sudo dnf install fuse
sudo dnf install flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak update
sudo dnf install gnome-terminal

For Arch-based systems:
sudo pacman -S fuse
sudo pacman -S flatpak
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
flatpak update
sudo pacman -S gnome-terminal

(This was only tested for debian/ubuntu) but should work on others
These commands may require administrator (sudo) privileges.
If you are using a different Linux distribution, please refer to your distribution's documentation for instructions on installing FUSE, Flatpak, and GNOME Terminal."


