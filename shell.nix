
{ pkgs ? import <nixpkgs> { }, lib ? pkgs.lib }:
pkgs.mkShell {
    buildInputs = with pkgs; [
        cmake 
        SDL2 
        glew 
        glm 
        embree2
    ];
}

