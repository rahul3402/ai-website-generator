import os
import argparse

skip_files = ['.DS_Store', '__pycache__']

def replace_folder_items(curr_input_folder, curr_output_folder, cached_placeholders):
	if not os.path.exists(curr_output_folder):
		os.makedirs(curr_output_folder)

	curr_files = os.listdir(curr_input_folder)
	curr_paths = [os.path.join(curr_input_folder, curr_file) for curr_file in curr_files]
	curr_write_paths = [os.path.join(curr_output_folder, curr_file) for curr_file in curr_files]
	for i, curr_path in enumerate(curr_paths):
		print(curr_path)
		curr_write_path = curr_write_paths[i]
		if curr_files[i] in skip_files:
			continue
		if os.path.isdir(curr_path):
			replace_folder_items(curr_path, curr_write_path, cached_placeholders)
		with open(curr_path, 'r') as f:
			with open(curr_write_path, 'w') as f2:
				for line in f:
					curr_line = line
					tokens = line.split('$$$')
					for j in range(1, len(tokens), 2):
						placeholder_name = tokens[j]
						print('Found placeholder', placeholder_name)

						if placeholder_name in cached_placeholders:
							placeholder_value = cached_placeholders[placeholder_name]
						else:
							print('Value for placeholder', placeholder_name + ':')
							placeholder_value = input()
							cached_placeholders[placeholder_name] = placeholder_value
						curr_line = line.replace('$$$' + placeholder_name + '$$$', placeholder_value)
					f2.write(curr_line)


def main(args):
	cached_placeholders = {'title': 'Fake News Detector'}
	replace_folder_items(args.input_folder, args.output_folder, cached_placeholders)

if __name__=='__main__':
	parser = argparse.ArgumentParser(description='')
	parser.add_argument('input_folder',
	                    help='Path of input folder containing all files with placeholders.')
	parser.add_argument('output_folder',
	                    help='Path of output folder containing replaced placeholders.')

	args = parser.parse_args()
	main(args)