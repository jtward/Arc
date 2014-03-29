module.exports = function(grunt) {

    var banner = "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            files: "build"
        },
        jshint: {
            files: [ "src/**/*.js" ]
        },
        concat: {
            options: {
                separator: ";"
            },
            files: {
                src: [ "src/arc.js" ],
                dest: "build/arc.js"
            }
        },
        wrap: {
            umd: {
                options: {
                    wrapper: [
                        "@export Arc",
                        "return Arc;"
                    ]
                },
                src: "build/arc.js",
                dest: "build/arc.js"
            },
            banner: {
                options: {
                    wrapper: [
                        banner
                    ]
                },
                src: "build/arc.js",
                dest: "build/arc.js"
            }
        },
        umd_wrapper: {
            files: {
                src: "build/arc.js",
                dest: "build/arc.js"
            }
        },
        uglify: {
            options: {
                banner: banner + "\n"
            },
            files: {
                src: "build/arc.js",
                dest: "build/arc.min.js"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks('grunt-wrap');
    grunt.loadNpmTasks('grunt-umd-wrapper');
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("default", ["clean", "jshint", "concat", "wrap:umd", "umd_wrapper", "wrap:banner", "uglify"]);

};