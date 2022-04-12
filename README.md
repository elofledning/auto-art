# AUTO ART
Automated generation of random images based on layers

![8](https://user-images.githubusercontent.com/28826610/159160994-2bc9591c-367c-4c49-a537-ca2ae7d571cb.png)
![7](https://user-images.githubusercontent.com/28826610/159161049-7209dbb9-23ad-4be6-b107-a401755d84f8.png)
![8](https://user-images.githubusercontent.com/28826610/159161054-3faa99bd-d448-4e04-a838-7cb198aea976.png)

# Find the input folder 
```
//input image layers will be auto discovered in this folder. Create subfolders for each layer
layer-config.ts ==> const dir = "C:\\Workspace\\auto-art-files\\input";
```

# Find the output folder 
```
index.ts ==> const outputDir = "C:\\Workspace\\auto-art-files\\output\\";
```

# Add layered images to input folder
Organise subfolder with name of layer like eg. 'background' with layer images files like 'background#20.png'
The #20 in above example will yield a 20% of being animated of alle files in 'background' folder has a weight distribution summing to 100%

# Install dependencies
```
npm install
```

# TS Compile
```
tsc
```

# Run node server (add number of editions to command)
```
node built/local/index.js (defaults to creating 1 edition)
node built/local/index.js 10 (creates 10 editions of images)
```

# Voila! check output folder for random images



