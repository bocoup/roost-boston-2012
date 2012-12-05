# Deploy, Deploy, Deploy

Dan Heberden - @danheberden - bocoup.com

## communicating with other repositories

a git repository is still just a folder with a .git directory in it, regardless of where it is

### remotes

lets you label repositories!

```bash
$ git remote add rebecca ~/Projects/BigCompanyServer/rebecca/projectA
```

means "rebecca" points to our shared network source directory

### yeah, but how the hell is *that* useful?

what if Rebecca emailed me to say that her branch has a change to be merged in?

## fetch

git has a place to keep remote repositories

```bash
$ git fetch rebecca
```

updates our ref "rebecca" so that we have the content locally

oh, you want to use that content?

```bash
$ git merge rebecca/feature1
```

"merge branch "feature1" from remote "rebecca"

# this opens a whole new world

Ok, but my co-workers and me aren't on a shared server

Fine, lets do better

## "Actual" remotes

server on linode? rackspace? your uncles basement?

have you ever used scp?

```bash
$ scp ~/myFile.txt danheberden@danheberden.com:/var/www/danheberden.com/myFile.txt
```

copy the file "myFile.txt to danheberden.com at the specified folder

seems reasonable - if we can connect to any remote server that we have ssh access too
with `username@domain.comOrIpAdress` then it stands to reason that another process
on our machine could, right?

```bash
$ git remote add theServer danheberden@somecoolserver.com:/var/www/myWebsite
```

now we can communicate with our remote server just like we did with the locally
available folder

## push

if we make changes that we want to send to the remote, use push.

```bash
git push theServer master
```

if we're adding a branch for the first time, let git know to track it

```bash
git push theServer -u someNewBranch
```

imagine, though, a web service that hosted your git project

## github.com

`github.com` lets you create repositories (remotes) and push to them, but
also has a really nice web interface and allows you to comment on things
(among other great features)

lets you have public repos for free?!

lets you have private repo's, but gonna cost you some $$$

Ok, that's cool but how can it help my workflow?

## part of deployment is working with other people

so lets do some live work

edit http://roost.bocoup.com/ from bocoup's repo

make a branch (because all new features or bug fixes or just about any
new work should be done in a branch)

edit the index page

verify that it works locally

push the new branch to github.com

submit a pull request

wait for our coworker to make sure that it works, is sensible, etc

decide that it's worth merging in

could you do that as efficiently, track-able and organized without git?

## wow - ok, could it get any better than that?

totally.

### part one - making the direct push better

post-receive

git lets us change some important pieces of how it works, namely where
the working tree actually is

## GIT\_WORK\_TREE

using this environment variable, we can have our `.git` directory in
one folder and the actual *contents* (the working tree) of it in another.

git has various hooks in .git/hooks that get executed when particular
actions get invoked. `pre-receive` is the most common one. It runs whenever the remote
gets a push to it. These are, by default, bash scrips. So we *could* do something
like this:

```bash
#!/bin/sh
# pre-receive

# go to where our git project is (NOT served to the web)
cd /var/www/gits/myProject
# set the work tree to our webserver directory
# and checkout master so that the work-tree gets
# the git files
GIT_WORK_TREE=/var/www/myProject.com git checkout master

### part two - automated

listen for post-receive hooks from github.com:

[http://github.com/danheberden/gith](http://github.com/danheberden/gith)

```javascript
var gith = require( 'gith' ).create( 9001 );
var cp = require( 'child_process' );

gith({
  repo: 'bocoup/roost',
  branch: 'master'
}).on( '*', function( payload ) {
  var commands = [
    'GIT_WORK_TREE=/var/www/roost.com git --git-dir=/var/www/gits/roost checkout master'
  ];
  cp.exec( commands.join(';'), function(){
    console.log( 'UPDATED THE WEBSITE!' );
  });
});
```

## A final note about remotes

If you have access to a git repository and want to download a copy of it, that
process is called "cloning".

```bash
git clone http://github.com/jquery/jquery
```

this automatically sets up the location you clone from as a remote for you,
with the label "origin".

If you ever see "origin" or "upstream" - these are just remotes. They just
happen to be really common because they are default names used by git and github.com

github.com has the feature to copy a repository you don't own into your own
github account so that you can make changes. This is called

## forking

Forking is the same as cloning a repo you have READ access to, making a new
repository on github.com, and pushing the contents of that copy to the new repo
you made. Github.com just made it way easier.

So when you clone YOUR repository, git of course adds the "origin" remote with
YOUR github.com uri.

However, you will most likely want to get future changes to the original
repository - github.com calls this the "upstream" repository; the one you
originally forked from. So add that remote:

```bash
git add remote upstream http://github.com/whateverAccount/andRepo
```

now you can pull upstream, add it to your code, and update your own
origin with the updates (and preferably, the branches of all the great
code you've been writing).

## pull requests

When you're done with those bug fixes or awesome features for that open-
source library you've been working on, push that branch up to github.com.

Now that your personal github "fork" has that new branch, you can opt to make
a "pull request" - that is, a message to the upstream repository that you
would like them to incorporate your branch into their master (you can actually
specify what branches).

It's just a nice way to organize/track/submit/review changes that you've made
against someone else's project. We at bocoup.com use this internally, even on
the same repository:

I make a branch to fix an issue, say, issue 59. So I make a branch called "issue_59".
When I commit the fix, I add #59 in my commit message. I then push the branch up
to github.com on our bocoup owned repository. Even though I *can* merge this into master,
I want to get company buy in. So I create a pull request from my issue_59 branch to
master. Everyone at bocoup gets a notice that I want to do this, and reviews my code
to comment on it with possibly a "looks great!" or "i think this should be different..."
kind of stuff.

Since I put "#59" in my commit message, github automatically associates that commit
if you open issue #59 which is a big convenience. I can then merge when I feel the
rest of bocoup agrees with my resolution for issue 59 and finally close the issue.

# That's It - Happy Coding!!!
