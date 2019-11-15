Gem::Specification.new do |spec|
  spec.name          = "open-sdg"
  spec.summary       = "A platform for collecting and disseminating data for the Sustainable Development Goal global indicators"
  spec.description   = "A platform for collecting and disseminating data for the Sustainable Development Goal global indicators"
  spec.version       = "1.0.0"
  spec.authors       = ["Open SDG team"]
  spec.email         = ["brockfanning@gmail.com"]
  spec.homepage      = "https://github.com/open-sdg/open-sdg"
  spec.licenses      = ["MIT"]
  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end
  spec.add_dependency "jekyll", "~> 3.0"
  spec.add_dependency "jekyll-open-sdg-plugins", "~> 1.0.0.rc2"
end
