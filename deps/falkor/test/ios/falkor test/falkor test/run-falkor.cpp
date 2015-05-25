//
//  run-falkor.cpp
//  falkor test
//
//  Created by David Corticchiato on 22/05/2015.
//  Copyright (c) 2015 David Corticchiato. All rights reserved.
//

#include <stdio.h>

#include <falkor.h>
#include "run-falkor.h"


void runFalkor() {
    falkor::Engine engine;
    engine.Run("print('Hello World !')");
}