#Datacultures

The Datacultures project running in Canvas

## Dependencies

* [Bundler](http://gembundler.com/rails3.html)
* [Git](https://help.github.com/articles/set-up-git)
* [Ruby 2.1.1](https://www.ruby-lang.org/en/downloads/)
* [PostgreSQL](http://www.postgresql.org/)
* [Rails 4.1.1](http://rubyonrails.org/download)
* [Rubygems](http://rubyforge.org/frs/?group_id=126)
* [Rvm](https://rvm.io/rvm/install/) - Ruby version managers

## Installation

1. Fork this repository, then clone it with the following command:

    ```bash
    git clone [url]
    ```

2. Bundle install (or just bundle is fine). May run into following blockers:

Install Ruby 2.1.1. For datacultures, we are using Ruby 2.1.1, so a ‘bundle install’ may prompt you to install that first.

Install ‘byebug’ gem. May or may not prompt you to install this gem. Will need to install Ruby 2.1.1 if have not yet.

3. If bundle install not completed yet, run bundle install one more time.

4. rake db:create:all.

NOTE: This is the shorthand for creating tables, users, and granting the users privileges. Similar to Step 3 in CalCentral README (which is more specific because it specifies user).

If encounter ‘FATAL: role datacultures does not exist’ error, may need to follow Step 3 from CalCentral README and replace calcentral with datacultures on all steps.

5. rake db: migrate

6. sudo gem install zeus

Once installed, start running zeus with ‘zeus start’ or ‘zeus s’.

NOTE: Zeus allows for faster rails boot time

7. In another tab, run “guard”

Now, from other windows (or an edit tool such as RubyMine), change either a spec or the code it is covering, and it will be run in the guard window.

8. In a 3rd tab, run “zeus s” → this one will start the datacultures localhost server

9. Have to run zeus server, guard, and a rails server all at once together
