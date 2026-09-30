{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  packages = with pkgs; [
    gnumake
    neovim
  ];

  VIMDECK_PATH = toString ../vimdeck.nvim;
}
