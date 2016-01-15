'use strict';
var generators = require('yeoman-generator'),
    _ = require('lodash');

module.exports = generators.NamedBase.extend({
    constructor: function () {
        generators.NamedBase.apply(this, arguments);
        console.log('inside ngc sub-generator', this.name);

        this.option('view', {
            desc: 'Determines if view is created along with controller',
            type: Boolean,
            default: false
        });
    },

    writing: function () {
        var fileNameFragment = getFileNameFragment(this.name);
        this.fs.copyTpl(
            this.templatePath('ng-controller.js'),
            this.destinationPath('src/app/' + fileNameFragment + '/' + fileNameFragment + '.controller.js'),
            {
                ctrlName: this.name,
                appName: this.config.get('ngappname')
            }
            );

        if (this.options.view) {
            this.fs.copyTpl(
                this.templatePath('ng-view.html'),
                this.destinationPath('src/app/' + fileNameFragment + '/' + fileNameFragment + '.html'),
                {
                    name: this.name
                });
        }

        function getFileNameFragment(ctrlName) {
            var ctrlIndex = ctrlName.indexOf('Ctrl');
            if (ctrlIndex === (ctrlName.length - 4)) {
                ctrlName = ctrlName.substring(0, ctrlIndex);
            }

            return _.kebabCase(ctrlName);
        }
    }
});