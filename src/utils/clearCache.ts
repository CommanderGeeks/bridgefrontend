import packageJson from "../../package.json";

export const clearOldVersionCache = () => {
  let version = localStorage.getItem("version");
  if (version !== packageJson.version) {
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });

      window.location.reload();
    }

    localStorage.clear();
    localStorage.setItem("version", packageJson.version);
  }
};
