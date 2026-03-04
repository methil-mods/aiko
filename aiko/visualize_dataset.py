import os
import xml.etree.ElementTree as ET
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

def visualize_stats():
    DATASET_PATH = "dataset/aiko_fr"
    stats = []

    if not os.path.exists(DATASET_PATH):
        print(f"Error: {DATASET_PATH} not found.")
        return

    for root, dirs, files in os.walk(DATASET_PATH):
        category = os.path.basename(root)
        if not category or category == "aiko_fr": continue
        
        for file in files:
            if file.endswith(".xml"):
                path = os.path.join(root, file)
                try:
                    tree = ET.parse(path)
                    root_xml = tree.getroot()
                    turns = len(root_xml.findall("assistant"))
                    stats.append({"Category": category, "Turns": turns})
                except Exception as e:
                    print(f"Error parsing {path}: {e}")

    df = pd.DataFrame(stats)
    if not df.empty:
        plt.figure(figsize=(14, 7))
        sns.set_theme(style="darkgrid")
        
        # Subplot 1: Number of files per category
        plt.subplot(1, 2, 1)
        sns.countplot(data=df, y="Category", palette="magma", order=df['Category'].value_counts().index)
        plt.title("Distribution des fichiers par catégorie")
        plt.xlabel("Nombre de fichiers")
        
        # Subplot 2: Average turns per category
        plt.subplot(1, 2, 2)
        avg_turns = df.groupby('Category')['Turns'].mean().sort_values(ascending=False).reset_index()
        sns.barplot(data=avg_turns, x="Turns", y="Category", palette="viridis")
        plt.title("Profondeur moyenne des dialogues (Tours Assistant)")
        plt.xlabel("Nombre de tours moyen")
        
        plt.tight_layout()
        output_file = "dataset_stats.png"
        plt.savefig(output_file)
        print(f"Visualisation sauvegardée dans : {output_file}")
        plt.show()
    else:
        print("Aucune donnée trouvée dans", DATASET_PATH)

if __name__ == "__main__":
    visualize_stats()
