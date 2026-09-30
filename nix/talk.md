---
wrap: 72
center_horizontal: true
center_vertical: true
margin: 4
use_figlet: false
header_style: underline
---

# Nix

From reproducible packages to an entire operating system

---

## Agenda

- What Nix is
- How the Nix store and build graph work
- Reproducible development environments
- How NixOS applies the model to an entire machine
- Why any of this is useful

---

## A different question

Most package managers ask:

> How do I install this package?

Nix asks:

> How do I describe this build so I can produce it again?

---

## What is Nix?

- A package manager
- A build system
- A functional configuration language
- An immutable store of build results

One model connects all four.

---

## Builds are functions

```text
build(source, compiler, dependencies, flags)
    -> /nix/store/9f8...-ripgrep-14.1.0
```

Change an input and you get a new output path.

The old output is not overwritten.

---

## Nothing fights over /usr/lib

```text
/nix/store/a1...-openssl-3.0
/nix/store/b7...-openssl-3.3
/nix/store/9f...-my-application
```

- Multiple versions coexist
- Dependencies do not compete globally
- Profiles select which results you see

---

## Realizing the graph

Nix evaluates a dependency graph, then realizes its missing outputs.

- Download an identical result from a binary cache
- Build it in an isolated environment when needed
- Assemble a new profile from immutable store paths
- Switch to that profile atomically

---

## One level up: the project

```bash
nix-shell        # shell.nix
nix develop      # flake.nix
```

Instead of describing one package, describe the complete environment needed
to work on a project.

Enter the project and the tools appear. Leave it and they disappear.

---

## A development shell

```nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = with pkgs; [
    nodejs_22
    ruby_3_4
    postgresql_17
    gnumake
  ];
}
```

```bash
nix-shell
```

---

# NixOS

One more level:

What if we describe the whole operating system with Nix?

---

## Describe the machine

```nix
{ pkgs, ... }:
{
  networking.hostName = "demo";
  time.timeZone = "Europe/Madrid";

  users.users.ducks = {
    isNormalUser = true;
    extraGroups = [ "wheel" "networkmanager" ];
    packages = with pkgs; [ firefox ];
  };

  services.openssh.enable = true;
  services.postgresql.enable = true;

  environment.systemPackages = with pkgs; [
    git ripgrep neovim
  ];

  networking.firewall.allowedTCPPorts = [ 22 ];
}
```

---

## Build, switch, keep the old one

```bash
sudo nixos-rebuild switch
```

- Modules combine into one system configuration
- Nix builds a complete new system generation
- Activation switches the running machine to it
- Older generations remain available for rollback

Even the boot menu can take you back.

---

## Executable documentation

Traditional instructions say:

> Install these packages, edit these files, then restart everything.

A NixOS configuration says what the machine should be.

It is buildable, reviewable, reproducible, and recoverable.

---

# The idea

Nix makes package builds explicit and immutable.

NixOS follows that idea to its conclusion:

> If we can describe a package, why not describe the entire computer?
