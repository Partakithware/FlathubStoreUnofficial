# FlathubStoreUnofficial
Install and Uninstall Flatpaks via Flathubs Install Button.
I do not often if ever post my applications, so use at your own risk.
Electron based Flathub store built into a .AppImage for you.

USE AT YOUR OWN RISK. I AM NOT TO BE HELD RESPONSIBLE FOR ANY DAMAGES THAT MAY OCCUR DUE TO THE USE OF THIS SOFTWARE. 
(I imagine it should be fine of course but idk what you are installing... and if you install something bad somehow that's not on me.)

This will allow you to use the flathub store by-itself to install/uninstall flatpackrefs. 

Update 1.0.2: Addresses what used to be listed here which was the fact that when you installed a Flatpak the install text did not change to uninstall, now it does. (experimental) temporary method was placed in that resolves this but not in the best way it could.

When you choose to install something it will open a terminal for confirmation of the install/uninstall.

This is at least a step in the direction of flathub on it's own instead of the using KDE/GNOME Discover/Software. (I imagine others have already done this but I didn't feel like looking around)
Should cover a broader range of DesktopEnvironments/Distros.

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
Anyhow this does not mix stores nor require you to type commands in the terminal yourself. It just opens the terminal for confirmations as when it didn't it felt invasive as it just installed the apps without notice of anysort.

VirusTotal Scan: [1.0.1 Scan](https://www.virustotal.com/gui/file/ce2e35ee15e43cca6bc08cc7a2ea2aa76a4bc2223b5522685a2855d44162e098?nocache=1)

Looking to contribute and make it more appealing and less trash? - Leave a comment :) - https://discourse.flathub.org/t/flathubstoreunofficial/9094

Edit: I will likely push a few more updates. I will slowly attempt to improve what I think may be less/more desired.

Update 1.0.1: Removed file bar in app for appearance and also made terminal auto-close after completed install/uninstall.

Updated my lame source so it can be pulled/pushed, edited and ridiculed.
This does include some unused files in /src at the time being.





