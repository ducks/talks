# Nix and NixOS lightning talk script

## Slide 1: Nix

I want to introduce Nix by starting with packages, then show what happens when
the same idea grows to cover an entire operating system.

Nix is often presented as a wall of syntax and strange terminology. The useful
part is the model underneath it, and that model begins with one different
question.

## Slide 2: Agenda

I will start with what Nix is and how its store and build graph work. Then I
will show how the same model creates reproducible development environments and,
with NixOS, describes an entire machine. I will finish with why that model is
useful in practice.

## Slide 3: A different question

Most package managers ask, "How do I install this package?"

That usually means downloading files and placing them into shared locations
such as `/usr/bin` and `/usr/lib`.

Nix asks, "How do I describe this build so I can produce it again?"

That changes the unit of work. Instead of a sequence of mutations to a machine,
we have a description of a result.

## Slide 4: What is Nix?

Nix is a package manager, a build system, a small functional configuration
language, and a store for immutable build results.

Those are not four unrelated products. The language describes builds, the build
system produces their outputs, the store holds those outputs, and the package
manager assembles them into environments we can use.

## Slide 5: Builds are functions

The central idea is that a build should behave like a function.

Its inputs include the source, compiler, dependencies, build flags, and build
instructions. Nix turns that description into a derivation, which is its build
recipe.

The result goes into a path under `/nix/store`. That path identifies the build
inputs. Change an input and Nix produces a different path instead of modifying
the old result.

## Slide 6: Nothing fights over /usr/lib

Because every result has its own store path, multiple versions of a library can
exist at the same time.

One application can use OpenSSL 3.0 while another uses 3.3. They do not fight
over a single global file. Each application points at the dependency graph it
was built with.

A profile is mostly a set of links selecting which of those immutable results
are visible in an environment.

## Slide 7: Realizing the graph

Nix evaluates the description into a dependency graph and checks which outputs
already exist.

If an identical result is available from a binary cache, Nix downloads it. If
not, it builds it in an isolated environment. It then assembles a new profile
and switches to it atomically.

The previous profile still exists, which makes rollback cheap. Nix is not
primarily moving around one large machine image. It is realizing the missing
parts of a graph.

## Slide 8: One level up: the project

So far, we have used Nix to describe individual packages. Now we can raise the
same idea one level and describe the complete environment needed to work on a
project.

A project can declare the exact compiler, libraries, database tools, Node
version, FFmpeg, or anything else it needs. With a traditional `shell.nix`, we
enter it using `nix-shell`. A modern flake exposes a development shell that we
enter using `nix develop`.

This makes setup part of the project rather than a list of instructions every
developer interprets differently. Enter the directory and the right tools are
available; leave the shell and they are gone from the environment.

Nix provides the machinery for reproducibility, although we still have to pin
our inputs and avoid builds that depend on uncontrolled network or time state.

## Slide 9: A development shell

This is a complete `shell.nix` for a project that needs Node, Ruby, PostgreSQL,
and Make.

None of those tools need to be installed globally. Running `nix-shell` evaluates
this file, realizes the packages, and opens a shell with all four on the path.
Another developer can enter the same environment from the same declaration.

For a production project I would pin the Nixpkgs revision so the package set is
stable over time. The important idea here is that the development environment
is code stored with the project, not a setup checklist.

## Slide 10: NixOS

Then NixOS raises the idea one more level. If Nix can describe a package, and a
project can describe its whole development environment, what if we describe the
whole operating system with Nix?

Instead of separately installing packages, editing configuration files, and
enabling services, we describe the machine we want.

## Slide 11: Describe the machine

This is a small but recognizable machine configuration. It gives the machine a
hostname and time zone, creates a normal user with administrator and networking
access, installs Firefox for that user, enables SSH and PostgreSQL, installs
some command-line tools system-wide, and opens port 22 in the firewall.

NixOS modules combine declarations like these into the packages, configuration
files, service definitions, kernel settings, and boot configuration required by
the machine.

The configuration describes desired state. It is not a shell script that hopes
the machine began in the expected state.

## Slide 12: Build, switch, keep the old one

`nixos-rebuild switch` builds a complete new system generation and activates it.

It does not upgrade the current installation one package at a time. Older
generations remain available, so we can roll back after a bad change. If the new
system cannot boot, we can select an older generation from the boot menu.

This does not make every application stateless or every migration reversible,
but it gives the operating system configuration a strong transactional model.

## Slide 13: Executable documentation

Traditional server documentation often says: install these packages, edit these
five files, run these commands in order, and restart everything.

A NixOS configuration says what the machine should be. We can build it, review
changes to it, reproduce it elsewhere, and retain a known previous generation.

The configuration becomes executable documentation instead of a historical
account of commands somebody probably ran.

## Slide 14: The idea

That is the progression I want to leave you with.

Nix begins with the idea that package builds should be explicit, isolated, and
immutable. NixOS follows that idea to its conclusion.

If we can describe a package this way, why not describe the entire computer?
