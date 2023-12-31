#version 420

// required by GLSL spec Sect 4.5.3 (though nvidia does not, amd does)
precision highp float;

layout(binding = 0) uniform sampler2D frameBufferTexture;
uniform float time;
layout(location = 0) out vec4 fragmentColor;


float offsets[9] = float[9](
        -7.302940716,
        -5.35180578,
        -3.403984807,
        -1.458429517,
        0.0,
        1.458429517,
        3.403984807,
        5.35180578,
        7.302940716
        );
float weights[9] = float[9](
        0.0125949685786212,
        0.0513831777608629,
        0.1359278107392780,
        0.2333084327472980,
        0.1335712203478790,
        0.2333084327472980,
        0.1359278107392780,
        0.0513831777608629,
        0.0125949685786212
        );

/**
 * Helper function to sample with pixel coordinates, e.g., (511.5, 12.75)
 * This functionality is similar to using sampler2DRect.
 * TexelFetch only work with integer coordinates and do not perform bilinerar filtering.
 */
vec4 textureRect(in sampler2D tex, vec2 rectangleCoord) {
    return texture(tex, rectangleCoord / textureSize(tex, 0));
}

/**
 * Implements the horizontal part of a 17 tap separable gaussian blur, using standard deviation of 3.0, calculated
 * using the formluas and excel sheet from  this blog: http://theinstructionlimit.com/gaussian-blur-revisited-part-two
 * The weights have been normalized to make the kernel not brighten or darken the image.
 */
void main() {
    vec4 result = vec4(0.0);
    // do a 17 tap blur by sampling a biliniarly filtered texture.
    for(int i = 0; i < 9; ++i) {
        result += textureRect(frameBufferTexture, gl_FragCoord.xy + vec2(offsets[i], 0.0)) * weights[i];
    }

    fragmentColor = result;
}
