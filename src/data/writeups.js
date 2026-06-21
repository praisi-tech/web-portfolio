export const writeups = [
  {
    id: 'web-gottagofast-next',
    title: 'gottagofast-next',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Easy',
    points: 100,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
    tags: ['Web', 'Business Logic Flaw', 'Request Tampering', 'Burp Suite', 'Client-Side Validation'],
    summary: 'Exploiting a client-side timing check in a typing game by intercepting and tampering with the submission request to bypass the 2-second limit.',
    challenge: 'A web-based typing game requires the user to submit a specific text in under 2 seconds â€” a requirement virtually impossible for a human to meet naturally. The challenge tests whether timing validation is performed secure-side or if it relies on user-controlled inputs.',
    methodology: [
      'Discovered that the submission timing parameter is sent as part of the JSON request rather than calculated server-side.',
      'Intercepted the submission request using Burp Suite before it reached the server.',
      'Modified the "time" parameter to be under the threshold.',
      'Forwarded the request to the server and received the flag.'
    ],
    solution: `1. Open the challenge page and configure Burp Suite to intercept traffic.
2. Type the requested text and click Submit.
3. Locate the intercepted POST /submit request containing 'text', 'time', and 'correct'.
4. Change the value of 'time' to something below 120 (which the server interprets as < 2 seconds).
5. Forward the request. The server will respond with the flag.`,
    flag: 'pu-flag{100k5-11k3-1t5-f45t3r-this-w4y-r1ght?}'
  },
  {
    id: 'web-ping-me',
    title: 'Ping-Me',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Easy',
    points: 150,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    tags: ['Web', 'Command Injection', 'RCE', 'ROT13', 'Base64'],
    summary: 'Exploiting an unsanitized ping form input to execute system commands, locate a hidden flag, and decode it.',
    challenge: 'A web form accepts an "IP address" input and executes a shell ping command on the server without sanitization. This is a classic OS Command Injection challenge designed to test how input concatenation can lead to code execution.',
    methodology: [
      'Used command chaining using the semicolon (;) character to run arbitrary commands.',
      'Enumerated directories using ls -la to find a hidden flag file.',
      'Read the file content, which was encoded in ROT13 and Base64.',
      'Wrote a python script to decode the ciphertext and retrieve the flag.'
    ],
    solution: `1. Inject a command using semicolon: '127.0.0.1; ls -la cache' to list files.
2. Find the file 'h1dd3n_fl4g.txt' in the cache directory.
3. Read the file: '127.0.0.1; cat cache/h1dd3n_fl4g.txt'.
4. The output is a ROT13-encoded Base64 string.
5. Decode the string in Python using codecs.decode(s, 'rot_13') then base64.b64decode().`,
    flag: 'pu-flag{c0mmAnD_Inj3ct10n_g0tcha_178337}'
  },
  {
    id: 'web-br3adcrumbszz',
    title: 'br3adcrumbszz',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    tags: ['Web', 'Path Traversal', 'LFI', 'URL Encoding Bypass', 'XOR', 'Base64'],
    summary: 'Bypassing path traversal filters using URL encoding to read sensitive files, and decrypting the flag with XOR cryptanalysis.',
    challenge: 'The endpoint viewer.php?file= is vulnerable to Path Traversal. The security filter only blocks literal dots (.) and slashes (/), which can be bypassed using URL encoding. The discovered flag is also protected by XOR and Base64.',
    methodology: [
      'Bypassed the traversal filter by using URL-encoded dot and slash characters (%2E%2E%2F).',
      'Traversed directories to read /etc/passwd and identified the user flag_finder.',
      'Accessed the flag file located in the user\'s home directory to get a Base64 string.',
      'Derived the XOR key using the known flag format prefix (pu-flag{) and decrypted the payload.'
    ],
    solution: `1. Probe '?file=../../etc/passwd' which gets blocked ("Illegal characters detected").
2. Bypass with URL encoding: '?file=index%2Ehtml' works.
3. Traverse to /etc/passwd using '%2E%2E%2F' repeatedly.
4. Find the user 'flag_finder' with home directory '/flag_is_here/'.
5. Access the flag file via the encoded path to obtain a Base64 string.
6. Decode Base64, then derive the XOR key from the known prefix 'pu-flag{'.
7. Decrypt the remaining bytes to reveal the flag.`,
    flag: 'pu-flag{Cr0n_J0b_w1tH_p4tH_tR4v3r5aL_Url3Nc0d3d}'
  },
  {
    id: 'web-saya-dor',
    title: 'saya-dor',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
    tags: ['Web', 'IDOR', 'Broken Access Control', 'Privilege Escalation'],
    summary: 'Exploiting an Insecure Direct Object Reference (IDOR) vulnerability in a ticketing system to escalate privileges and access tickets of other users.',
    challenge: 'The ticketing web application does not restrict ticket details access based on ownership. This Broken Access Control (IDOR) can be chained for privilege escalation (escalating and closing tickets belonging to other users).',
    methodology: [
      'Analyzed a self-created ticket to establish a baseline ID format.',
      'Manipulated the ticket ID in the URL to view a ticket belonging to the support user.',
      'Exploited authorization-free endpoints (escalate, close) to modify the support ticket.',
      'Navigated to the newly unlocked flag page in the dashboard.'
    ],
    solution: `1. Log in with valid credentials.
2. Create a new support ticket to verify the URL structure.
3. Change the ticket ID in the URL to '7' (/ticket/7), accessing a support ticket.
4. Click the 'Escalate' and 'Close' buttons on the ticket.
5. Navigate to the 'Flag' section in the menu to retrieve the flag.`,
    flag: 'pu-flag{br0k3n_4cc355s_c0ntr01_1D0r_ch41n}'
  },
  {
    id: 'web-brok3myh34rt',
    title: 'brok3myh34rt',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Medium',
    points: 250,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    tags: ['Web', 'Path Traversal', 'LFI', 'PHP Filter Wrapper', 'Laravel Security'],
    summary: 'Bypassing path traversal filters in a Laravel app using a PHP stream wrapper filter to extract files from the local filesystem.',
    challenge: 'A Laravel application includes a download?file= endpoint that performs URL-decoding on paths without proper validation. This opens up Path Traversal and Local File Inclusion (LFI) via the php://filter stream wrapper.',
    methodology: [
      'Discovered a download endpoint hosting a decoy flag file.',
      'Analyzed Laravel directory structure through documentation files.',
      'Used php://filter to read file contents as Base64 to bypass server filters.',
      'Automated search using a script to test path depths and retrieve the real flag.'
    ],
    solution: `1. Find the Downloads page (/files) containing 'flag-no.txt' (decoy).
2. Read 'docs/info.txt' to understand the Laravel directory layout.
3. Attempt traversal to 'storage/app/public/flag.txt' directly (returns 404).
4. Formulate a payload using 'php://filter/convert.base64-encode/resource='.
5. Write a python script to brute-force depth traversal and URL-encoding combinations.
6. Decode the successfully retrieved base64 payload to read the flag.`,
    flag: 'pu-flag{th1s-1s-c0ns3qu3ncEs-0f-uns3cur3-p4th}'
  },
  {
    id: 'web-htmlToPdf',
    title: 'htmlToPdf',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&q=80',
    tags: ['Web', 'SSRF', 'Local File Disclosure', 'Server Side Rendering'],
    summary: 'Leveraging a Server-Side Request Forgery (SSRF) and Local File Disclosure vulnerability in an HTML-to-PDF converter to view internal system files.',
    challenge: 'An HTML-to-PDF converter renders HTML documents server-side and fetches external resources referenced in the document. This behavior exposes the system to Server-Side Request Forgery (SSRF) and Local File Disclosure via the file:// scheme.',
    methodology: [
      'Injected iframe elements containing a file:// source path into the HTML input.',
      'Discovered that the server parses the local path and renders its contents inside the generated PDF.',
      'Fuzzed file paths to locate the correct flag file destination.'
    ],
    solution: `1. Input an iframe pointing to file:///flag (returns blank/no flag).
2. Try variations of the file path.
3. Input '<iframe src="file:///flag.txt"></iframe>' and convert.
4. Download the generated PDF to read the flag directly.`,
    flag: 'pu-flag{4n0th3r-SSrF-w1th-1nt3rn4l-pOrt-5c4nn1ng-f0und!}'
  },
  {
    id: 'web-commentcommentcomment',
    title: 'CommentCommentComment',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Easy',
    points: 150,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&q=80',
    tags: ['Web', 'XSS', 'Insecure API', 'Static Secret', 'Broken Auth'],
    summary: 'Using Cross-Site Scripting (XSS) to confirm front-end vulnerabilities and calling an unauthenticated backend API with a leaked static secret.',
    challenge: 'A comment submission form is vulnerable to Cross-Site Scripting (XSS). Additionally, a backend API (/api/flag) is protected only by a static secret without proper user session authentication.',
    methodology: [
      'Injected a simple HTML script tag into the comment form to trigger an alert box and verify the XSS vulnerability.',
      'Analyzed client scripts to discover the static header key and API endpoint.',
      'Sent a fetch request with the static secret in headers directly via the browser console to retrieve the flag.'
    ],
    solution: `1. Log in using test credentials (user/12345).
2. Submit '<script>alert(1)</script>' in the comment box to confirm XSS.
3. Open developer console.
4. Execute: fetch('/api/flag', {headers: {'X-Admin-Secret': 'SuperSecretAdminSessionToken'}}).
5. View JSON response to obtain the flag.`,
    flag: 'pu-flag{XSS_1s_Fun_With_A_B4ck3nd}'
  },
  {
    id: 'web-opendrive',
    title: 'Opendrive',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Hard',
    points: 300,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
    tags: ['Web', 'File Upload Vulnerability', 'Htaccess Bypass', 'RCE', 'Burp Repeater'],
    summary: 'Bypassing filename restrictions using a custom .htaccess configuration file to upload and execute a PHP webshell on the server.',
    challenge: 'The web file upload functionality lacks proper filename and MIME-type validation. An attacker can upload a .htaccess file to override server configurations, map custom extensions to the PHP engine, and execute uploaded scripts.',
    methodology: [
      'Uploaded a .htaccess file instructing Apache to treat custom extensions (like .trickers) as PHP execution files.',
      'Uploaded a PHP script with the custom extension containing a command execution shell.',
      'Accessed the uploaded script URL to execute backend commands and view the flag.'
    ],
    solution: `1. Upload a text file and intercept with Burp Suite (send to Repeater).
2. Change the filename to '.htaccess', content-type to 'text/plain', and set body to 'AddType application/x-httpd-php .trickers'. Send request.
3. Upload a new file, change filename to 'praisilia.trickers', and insert a PHP command to read the flag.
4. Access the uploaded file URL at /uploads/praisilia.trickers to trigger the script execution.`,
    flag: 'pu-flag{f1l3_upl04d_vuln3r4b1l1ty_found_using_htaccess}'
  },
  {
    id: 'web-healthcheck',
    title: 'Health Check here :)',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    tags: ['Web', 'SSRF', 'Internal Network Access', 'Trusted Service Bypass'],
    summary: 'Exploiting an unrestricted Health Checker form to pivot into the server\'s internal docker network and retrieve private resources.',
    challenge: 'A "Health Checker" form takes user-supplied URLs and issues HTTP requests from the backend server without host filtering. This classic SSRF allows access to internal network nodes and services.',
    methodology: [
      'Identified that the backend doesn\'t blacklist internal IP ranges (127.0.0.1, localhost, 172.x.x.x).',
      'Fuzzed subnet configurations to discover active internal services.',
      'Sent a request to the correct internal container ip to access the trusted web dashboard.'
    ],
    solution: `1. Test standard SSRF targets (localhost, 127.0.0.1, .env, cloud metadata).
2. Probe internal Docker ranges (e.g. 172.16.238.10).
3. Input 'http://172.16.238.10:80' into the health check box.
4. Read the returned HTML container payload displaying the flag.`,
    flag: 'pu-flag{SSRF_P1vot_T0_V1ct0ry!}'
  },
  {
    id: 'web-rental-store',
    title: 'Rental-Store',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Medium',
    points: 250,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
    tags: ['Web', 'XXE', 'XML Injection', 'Local File Disclosure', 'Burp Suite'],
    summary: 'Exploiting an insecure XML parser in a car reservation form to perform XML External Entity (XXE) injection and read local files.',
    challenge: 'A car rental reservation endpoint accepts raw XML and reflects input fields back in the JSON response. The XML parser does not disable external entity resolution, exposing the application to XML External Entity (XXE) injection.',
    methodology: [
      'Intercepted the XML payload structure using Burp Suite.',
      'Defined a custom DOCTYPE containing a local file system entity pointing to /etc/passwd.',
      'Verified external entity resolution and fuzzed for target flag file locations.'
    ],
    solution: `1. Locate the reservation form that submits data via XML.
2. Intercept the POST request and send it to Burp Suite Repeater.
3. Add a DOCTYPE with an external file entity pointing to /etc/passwd to confirm vulnerability.
4. Modify the entity path to 'file:///flag.txt'.
5. Submit the XML. The server's parsed response will contain the flag content.`,
    flag: 'pu-flag{Supra_MK4_XXE_1997_2JZ_GTE}'
  },
  {
    id: 'web-techblog',
    title: 'techblog',
    competition: 'PU CTF',
    category: 'Web',
    difficulty: 'Hard',
    points: 350,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    tags: ['Web', 'IDOR', 'SSTI', 'RCE', 'Privilege Escalation', 'Broken Authentication'],
    summary: 'Chaining an IDOR vulnerability for admin account hijack with a Server-Side Template Injection (SSTI) to achieve remote code execution.',
    challenge: 'A technology blog application features two chained vulnerabilities: (1) IDOR on the password change endpoint that allows full admin hijack, and (2) Server-Side Template Injection (SSTI) in post title fields editable by admins, resulting in Remote Code Execution (RCE).',
    methodology: [
      'Leaked the admin account ID by querying the public /api/posts endpoint.',
      'Sent a POST request to change the admin password using their ID directly (IDOR).',
      'Logged in as admin and accessed the post customization panel.',
      'Injected a Jinja/Python SSTI payload into the blog title field to spawn a system subprocess.'
    ],
    solution: `1. Enumerate '/api/posts' to leak the admin's 'userid'.
2. Intercept the password change request in Burp and substitute the admin's 'userid' to reset their password.
3. Log in with admin credentials.
4. Edit a post and inject SSTI template code in the title field: '{{lipsum.globals.os.popen("cat /flag.txt").read()}}'.
5. View the updated post to read the executed terminal output containing the flag.`,
    flag: 'pu-flag{no_validation_l0g1cs_4r3_c0mm0n}'
  },
  {
    id: 'crypto-corsair',
    title: 'coRSAir',
    competition: 'PU CTF',
    category: 'Cryptography',
    difficulty: 'Easy',
    points: 100,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    tags: ['Cryptography', 'RSA', 'Low Exponent Attack', 'No Padding', 'CubeRoot'],
    summary: 'Exploiting a low public exponent (e=3) in an unpadded RSA implementation to decrypt ciphertext by taking the integer cube root.',
    challenge: 'A classic RSA challenge using a small public exponent (e=3) and no padding. Since the message is small enough that m^e < N, no modular reduction wraps around N, allowing direct extraction of the plaintext.',
    methodology: [
      'Identified e=3 public exponent and confirmed ciphertext size did not wrap modulo N.',
      'Calculated the mathematical integer cube root of the ciphertext value directly.',
      'Converted the root integer representation into readable ASCII text bytes.'
    ],
    solution: `1. Extract public values N, E=3, and C.
2. Write a Python helper utilizing binary search to find the integer cube root of C.
3. Compute m = iroot(C, 3) and check that m^3 matches C.
4. Convert the resulting integer m to bytes and print the text string.`,
    flag: 'pu-flag{e_v4lU3_sh0uLD_n0T_b3_sm4LL}'
  },
  {
    id: 'crypto-triple-threat',
    title: 'TripleThreatSolid',
    competition: 'PU CTF',
    category: 'Cryptography',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=800&q=80',
    tags: ['Cryptography', 'Classical Ciphers', 'Vigenere', 'Atbash', 'Columnar Transposition', 'OSINT Clue'],
    summary: 'Decrypting a multi-layered classical cipher string by reversing the encryption order and discovering the key via OSINT.',
    challenge: 'An encrypted token is protected by three layers of ciphers: Columnar Transposition, Atbash, and a VigenÃ¨re-like custom shift. The goal is to reverse the process and trace a hidden key mentioned on an external profile.',
    methodology: [
      'Reversed the application logic order: VigenÃ¨re-like -> Atbash -> Columnar Transposition.',
      'Searched social profiles for hints regarding the decryption key.',
      'Identified the secret key "KATANA" from a moderator\'s Discord bio.',
      'Decrypted the cipher sequence using a Python reverse script.'
    ],
    solution: `1. Analyze the encryption script to document the pipeline order.
2. Note the decryption sequence: Vigenere -> Atbash -> Columnar Transposition.
3. Conduct OSINT searches for potential keys, finding 'KATANA' in the coordinator's Discord bio.
4. Write a script to perform the reverse cipher operations with the key 'KATANA' to extract the flag.`,
    flag: 'pu-flag{4re-y0u-5uR3-Cyb3r-S3cur1ty-I5-345y-n0w?}'
  },
  {
    id: 'crypto-should-be-ez',
    title: 'shouldBeEz',
    competition: 'PU CTF',
    category: 'Cryptography',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80',
    tags: ['Cryptography', 'XOR', 'Brute Force', 'Perfect Square', 'Weak Keystream'],
    summary: 'Breaking a custom mathematical encryption scheme by brute-forcing candidate bytes and checking for perfect square relations.',
    challenge: 'A custom encryption scheme XORs each byte of the flag with the square of a large prime number (s = nÂ²). Although the resulting integers are huge, the byte search space is only 256 possibilities per character.',
    methodology: [
      'Analyzed the mathematical properties of the keystream generator.',
      'Tested all 256 byte values for each ciphertext integer.',
      'Validated whether XORing the ciphertext with the candidate byte results in a perfect square of a prime number.'
    ],
    solution: `1. Parse the ciphertext integers list.
2. For each ciphertext value E, loop candidate byte b from 0 to 255.
3. Check if s = E ^ b is a perfect square (isqrt(s)^2 == s).
4. Verify that the square root is a prime number within the specified bounds.
5. Assemble the valid bytes to compile the flag.`,
    flag: 'pu-flag{1tz-E45Y-r1ght?-0r-iS-1t-not?}'
  },
  {
    id: 'crypto-exorcise',
    title: 'eXORcise',
    competition: 'PU CTF',
    category: 'Cryptography',
    difficulty: 'Easy',
    points: 150,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    tags: ['Cryptography', 'XOR', 'Caesar Cipher', 'Base64', 'OSINT Clue'],
    summary: 'Decoding a Caesar cipher clue file to discover game character names, joining them to form a key, and decrypting a XOR payload.',
    challenge: 'An encoded text file (note.txt) contains a Caesar cipher describing five gaming characters. The concatenated names of these characters form the decryption key for a final base64-encoded XOR payload.',
    methodology: [
      'Decoded the note.txt using a Caesar shift tool.',
      'Identified the five Valorant/League characters described in the clues.',
      'Created the key string: MIRAOMENREYNACAITLYNKILLJOY.',
      'Decoded the base64 ciphertext and decrypted it using the derived key.'
    ],
    solution: `1. Unzip the challenge assets.
2. Decode 'note.txt' with a Caesar cipher shift to retrieve character clues.
3. Map descriptions to characters: MIRA, OMEN, REYNA, CAITLYN, KILLJOY.
4. Concatenate to construct key: 'MIRAOMENREYNACAITLYNKILLJOY'.
5. Execute a script to base64-decode 'chal.txt' and XOR-decrypt it with the key.`,
    flag: 'pu-flag{x0R-1s-v3ry-fUn-4-L34rn1nG-CryPt0gr4phY}'
  },
  {
    id: 'osint-find-my-aunt',
    title: 'FindMyAunt',
    competition: 'PU CTF',
    category: 'OSINT',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
    tags: ['OSINT', 'Geolocation', 'Image Analysis', 'Google Maps', 'PicartaAI'],
    summary: 'Geolocating a rural bridge photo using AI search tools and matching distances to local venues to build a structured geolocation flag.',
    challenge: 'An OSINT/Geolocation challenge based on a narrative journey. The goal is to track the route of a relative using a single countryside photo, distance hints, and local business descriptions.',
    methodology: [
      'Analyzed the photo terrain and water body characteristics.',
      'Used Picarta.ai and reverse image search to geolocate the river.',
      'Identified the River Avon in England and fuzzed for luxury hotels within a 10km radius.',
      'Traced local dining establishments in nearby cities to confirm details.'
    ],
    solution: `1. Inspect the photo features: countryside river, brick bridge. Picarta.ai suggests the River Avon, UK.
2. Locate luxury accommodation near the river near Evesham: 'The Bell at Salford Priors' (postcode WR11 8UT).
3. Find the nearest town: Stratford-upon-Avon.
4. Find the matching local wine bar/restaurant: Loxley's Restaurant & Wine Bar at 3 Sheep Street.
5. Construct the flag payload according to the format.`,
    flag: 'pu-flag{Avon_WR11-8UT_Stratford-upon-Avon_3-Sheep-St}'
  },
  {
    id: 'osint-my-obsession',
    title: 'MyObession',
    competition: 'PU CTF',
    category: 'OSINT',
    difficulty: 'Easy',
    points: 100,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    tags: ['OSINT', 'Instagram', 'Steganography Lite', 'Social Media Investigation'],
    summary: 'Investigating an Instagram account to locate hidden, low-contrast text fragments hidden within target image uploads.',
    challenge: 'A social media tracking challenge focusing on the Instagram handle "caitvyne". The flag is divided into fragments hidden in the image pixels with extremely low contrast, requiring visual tuning to inspect.',
    methodology: [
      'Located the public profile using the handle "caitvyne".',
      'Cross-referenced post descriptions with the target clues.',
      'Downloaded candidate images and adjusted their brightness and contrast levels to read the low-visibility text.',
      'Reassembled the flag fragments.'
    ],
    solution: `1. Search for the Instagram handle 'caitvyne'.
2. Match the 4 clues to specific uploaded posts.
3. Zoom into the images and increase image exposure/brightness.
4. Note down the hidden text fragments from the images.
5. Combine the fragments to build the final flag.`,
    flag: 'pu-flag{n0t-y0ur-Ordin4ry-Qu33n}'
  },
  {
    id: 'osint-lo-and-behold',
    title: 'LoAndBehold',
    competition: 'PU CTF',
    category: 'OSINT',
    difficulty: 'Hard',
    points: 300,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
    tags: ['OSINT', 'Reverse Image Search', 'Flight Tracking', 'Google Lens', 'FlightAware', 'SeatMaps'],
    summary: 'Reconstructing a multi-stage flight itinerary from image snippets, flight tracking logs, and aircraft seating maps to solve a detailed puzzle.',
    challenge: 'An intricate OSINT investigation combining reverse image searches, boarding pass fragments, and airline scheduling data to reconstruct a travel timeline. The target is a specific formatted string consisting of Plus Codes, flight numbers, station names, airports, plane models, and seat numbers.',
    methodology: [
      'Used Google Lens to identify a store facade location in Jakarta.',
      'Extracted airline branding details and times to look up historical flight tables on FlightAware.',
      'Traced connecting flight routes from Bangkok to Brussels.',
      'Cross-referenced seat positions and plane types using specialized map dashboards.'
    ],
    solution: `1. Identify the store facade using Google Lens: Plaza Senayan, Jakarta (Plus Code: QQFX+RP).
2. Extract ticket time and destinations: Jakarta (CGK) to Bangkok (DMK) on Thai Lion Air (flight SL119).
3. Find transit landmark: Chatuchak Park MRT station.
4. Find Brussels-bound flight details from Bangkok (TG934 BKK-BRU).
5. Identify the aircraft model: Boeing 787-8.
6. Locate seat position (window-side, row A, business class): 11A.
7. Compile findings.`,
    flag: 'pu-flag{QQFX+RP_SL119_ChatuchakPark_Brussels_Boeing7878_11A_Business}'
  },
  {
    id: 'osint-name-jump',
    title: 'NameJumpBhonkUpUp',
    competition: 'PU CTF',
    category: 'OSINT',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    tags: ['OSINT', 'Username Tracing', 'Social Media Investigation', 'Hidden Data', 'URL Shortener'],
    summary: 'Tracking a single username across multiple digital profiles and YouTube playlists to uncover a hidden spreadsheet containing flag files.',
    challenge: 'A tracing puzzle starting from a single target username "goodctfboi". The objective is to follow a digital footprint across platforms to discover a hidden configuration file.',
    methodology: [
      'Queried search engines for the profile name "goodctfboi" and found their X account.',
      'Followed account links to a YouTube channel and checked public playlists.',
      'Traced playlist collaborators iteratively to find a shortlink URL embedded in metadata.',
      'Accessed a shared spreadsheet and found the flag hidden via matching font color.'
    ],
    solution: `1. Search for username 'goodctfboi' to find their X profile linking to YouTube.
2. Inspect YouTube channel playlists and trace collaborator profiles.
3. Locate the hidden shortlink URL 'https://shorturl.at/gAo9j' in a playlist description.
4. Open the destination Google Sheet.
5. Copy the spreadsheet cell contents into a text editor to reveal text hidden by white-on-white styling.`,
    flag: 'pu-flag{4re-Y0u-3V3n-A-G00dSt4lk3r-t0-f1nd-m3}'
  },
  {
    id: 'misc-stocklist',
    title: 'StockList',
    competition: 'PU CTF',
    category: 'Miscellaneous',
    difficulty: 'Medium',
    points: 150,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    tags: ['Misc', 'Custom Substitution Cipher', 'Hex Encoding', 'Leetspeak'],
    summary: 'Decoding a hex string payload to read hints and using custom substitution rules to decode list elements.',
    challenge: 'The application hides a key inside a hex string and a custom substitution grid (columns A-E). The goal is to decrypt game list values to find the flag.',
    methodology: [
      'Parsed and converted the hex string to ASCII text for hints.',
      'Analyzed the custom substitution tables in the web view.',
      'Decoded the list of games to identify the target unreleased entry.',
      'Reconstructed leetspeak values into the final flag.'
    ],
    solution: `1. Convert the hex string found on page to ASCII: "the flag is on the unreleased game :) Good luck :D".
2. Study the mapping matrix (columns A to E).
3. Decode list entries using the matrix.
4. Find the entry corresponding to "Little Nightmares III".
5. Convert the decoded leetspeak characters to standard text.`,
    flag: 'pu-flag{y0u-H4v3nT-s3En-4nYtH1n9-y3t}'
  },
  {
    id: 'misc-broken-bot',
    title: 'BrokenBot',
    competition: 'PU CTF',
    category: 'Miscellaneous',
    difficulty: 'Easy',
    points: 100,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    tags: ['Misc', 'Audio Transcription', 'ASCII Decoding', 'Steganography Lite'],
    summary: 'Transcribing numeric digit sequences spoken in an audio file and decoding the numbers as decimal ASCII characters.',
    challenge: 'An audio file (.m4a) features a broken voice assistant reciting numbers. The numbers must be transcribed and decoded from decimal ASCII format.',
    methodology: [
      'Transcribed the spoken numbers from the audio file.',
      'Parsed the numbers as groups of decimal ASCII values.',
      'Mapped the decimal codes to characters to rebuild the text.'
    ],
    solution: `1. Transcribe the audio recording using tools like TurboScribe.
2. Compile the numbers into a single digit string.
3. Segment into 3-digit ASCII decimal representations (e.g. 112, 117, ...).
4. Convert the decimal codes to ASCII bytes in Python.`,
    flag: 'pu-flag{ASCII-1n-5ound-c4n-Y0u-h34R?}'
  },
  {
    id: 'misc-remote-worker',
    title: 'RemoteWorkerSoBusyLha',
    competition: 'PU CTF',
    category: 'Miscellaneous',
    difficulty: 'Medium',
    points: 200,
    date: 'October 2025',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
    tags: ['Misc', 'Acrostic Puzzle', 'Pattern Recognition', 'iCalendar', 'Leetspeak'],
    summary: 'Reordering calendar events chronologically and extracting the first letters of each event title to reveal an acrostic message.',
    challenge: 'A series of iCalendar (.ics) entries have titles that look random. The challenge requires analyzing chronological order and applying an acrostic decode schema.',
    methodology: [
      'Compiled the list of calendar events from screenshots.',
      'Sorted all events chronologically.',
      'Extracted the first letter of each event\'s summary name.',
      'Decoded the leetspeak sequence.'
    ],
    solution: `1. Gather all calendar screenshots and .ics entries.
2. Sort them chronologically by date.
3. Take the first letter of the 'SUMMARY' parameter for each item.
4. Join letters to form: 'h4ve-y0u-trY-t0-r34d-c4lendar-b3f0re'.`,
    flag: 'pu-flag{h4ve-y0u-trY-t0-r34d-c4lendar-b3f0re}'
  }
];


