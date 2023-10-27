#include <GL/glew.h>
#include <string>
#include <vector>

namespace labhelper {
GLuint loadHdrTexture(const std::string &filename);
GLuint loadHdrMipmapTexture(const std::vector<std::string> &filenames);

void saveHdrTexture(const std::string &filename, GLuint texture);
} // namespace labhelper
