<a href="https://github.com/TryGhost/Ghost"><img src="https://cloud.githubusercontent.com/assets/120485/6622822/c4c639fe-c8e7-11e4-9e64-5bec06c8b4c3.png" alt="Ghost" /></a>

![Ghost Screenshot](https://cloud.githubusercontent.com/assets/120485/6626466/6dae46b2-c8ff-11e4-8c7c-8dd63b215f7b.jpg)

![Ghost is a simple, powerful publishing platform that allows you to share your stories with the world.](https://cloud.githubusercontent.com/assets/120485/6626501/b2bb072c-c8ff-11e4-8e1a-2e78e68fd5c3.png)

[Find full details on Ghost here](https://github.com/tryghost/Ghost)


# Deploying Ghost to IBM Bluemix

## 1-click button auto deploy

Use this 1-click button to auto deploy a new Ghost blog to your IBM Bluemix account:

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/darcy202/bluemix-ghost)

## Or you can manually configure and deploy

The following steps detail using the git and cf cli tools:

1. `git clone https://github.com/darcy202/bluemix-ghost.git`
1. `cf create-space myblog`
1. `cf target -s myblog`
1. `cf create-service cleardb spark ghost-mysql-db`
1. `cf push ghost --random-route` for a quick start, or `cf push ghost -n <unique name for my blog>` to set the subdomain.


## Supported regions

- US South
- United Kingdom

**Note: **This will not work out of the box in the Sydney region, due to the MySQL DB (from ClearDB) dependency not being available in the Sydney region.
However, manual steps can be taken to create a MySQL service in this region.



## File storage

By default any image uploads will be lost on app restart, as the file system is not persisted. If you need image storage you'll need to configure one of the storage services.

### File storage: using Cloudinary

1. Create an account at http://cloudinary.com
1. Create an environment variable named CLOUDINARY containing your cloudinary credentials, in the format of `{"cloud_name":"...", "api_key":"...", "api_secret":"..."}`. You can do this via the Bluemix console or using the cf cli with: `cf set-env ghost CLOUDINARY '{"cloud_name":"...", "api_key":"...", "api_secret":"..."}'`
1. Let Bluemix restage the app to pick up the Cloudinary config or do manually with: `cf restage ghost`


### Configure your new Ghost blog

Visit https://\<your ghost blog\>/ghost to begin the setup of your new blog.

For more help on using Ghost visit http://support.ghost.org/user-guide/using-ghost/ .