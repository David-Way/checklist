import shell from 'shelljs';
import path from 'path';

//==============
// Generate index for checklist items
//==============

// checklist data directory
const checklistDataDir = 'src/data/checklist';
const checklistOutputFile = path.join(checklistDataDir, 'index-[generated-file].json');

// check directory existence
if (!shell.test('-d', checklistDataDir)) {
    console.error(`Directory not found: ${checklistDataDir}`);
    shell.exit(0);
}

// find all checklist objects, excluding the index/output file
const checklistFiles = shell.ls(`${checklistDataDir}/*json`).filter(file => file !== checklistOutputFile);
if (checklistFiles?.length === 0) {
    console.warn('No Checklist files to process');
}

// process checklist files
const checklistIndexContent = [];
checklistFiles.forEach(checklistFile => {
    const fileContent = shell.cat(checklistFile);

    try {
        const jsonFileContent = JSON.parse(fileContent);

        // build an index file with key information for each file
        checklistIndexContent.push({
            id: jsonFileContent?.id,
            version: jsonFileContent?.version,
            title: jsonFileContent?.title,
            description: jsonFileContent?.description,
            meta: {
                ...jsonFileContent?.meta,
                tags: [
                    ...jsonFileContent?.meta?.tags
                ]
            } 
        });

        // write contents out into new output file
        new shell.ShellString(
            JSON.stringify(
                checklistIndexContent,
                null,
                2
            )
        ).to(checklistOutputFile);
    } catch (error) {
        console.error(`Error parsing JSON from file: ${checklistFile}`, error);
    }
});

console.info(`✓ Generated api index file (including ${checklistFiles?.length} items) in ${checklistOutputFile}`)