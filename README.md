# One Chord, Many Smiles — Family Ukulele App

A free, beginner-friendly, single-page web app for family ukulele activities.

## What it does
- Play the four open ukulele strings (G, C, E, A), or use keyboard keys 1–4.
- Hear an open-string strum or C major chord.
- Learn the C chord with a simple fretboard diagram.
- Record **sounds generated within the app**, replay and download the audio.
- Works without logins, external services, third-party libraries or data uploads.

**Important:** Recording does not capture microphone input or an acoustic ukulele. Audio is synthesized, not a sample of a real ukulele. Some browser/device combinations may not support recording; playing notes should still work.

## Publish with GitHub Pages (no coding tools needed)
1. Sign in at https://github.com and select **New repository**.
2. Name it `family-ukulele`, choose **Public**, and create the repository.
3. Click **Add file → Upload files**. Upload the three files `index.html`, `style.css`, and `app.js` from this folder. (You can also upload `README.md`.) **Do not upload only the ZIP file**; GitHub Pages needs the actual files.
4. Select **Commit changes**.
5. Open **Settings → Pages** in the repository.
6. Under **Build and deployment**, choose **Deploy from a branch**; select `main` and `/(root)`; click **Save**.
7. Wait a few minutes. Your public address will be `https://YOUR-USERNAME.github.io/family-ukulele/` (replace `YOUR-USERNAME`). The Pages screen will also show the live link.
8. Open it on your phone and test all four strings, the C chord, and recording.

To edit later: open the file in GitHub, click the pencil/edit icon, make your changes and commit. GitHub Pages will republish automatically.

## Run locally
Open `index.html` in a browser. For the most reliable behaviour, publish via GitHub Pages or serve the folder with a local HTTP server.

## Privacy and accessibility
No recordings leave the browser unless the user chooses to download and share them. Keyboard controls and focus outlines are included. Browser audio requires an initial user tap/click.

## License
This example project is offered under the MIT License; see `LICENSE`.
