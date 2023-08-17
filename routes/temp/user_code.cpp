#include <iostream>

int main() {
    int *ptr = nullptr;
    *ptr = 42; // This will cause a segmentation fault
    return 0;
}