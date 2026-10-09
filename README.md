# IT202 Project 1 - Moving On Up

## Phases 1 and 2

A representative login interface for the fictional moving company Moving On Up, built with plain HTML, CSS, and JavaScript.

### Files

- `index.html` - login form and page content.
- `script.js` - regular-expression validation, fictional account verification, password visibility, and form events.
- `styles.css` - centered translucent form, blue labels, green border, keyboard focus styles, and mobile layouts.
- `images/MovingPhoto.avif` - selected moving image used as the page background.
- `images/moving-background.svg` - original illustration retained as an optional alternative background.

### Open the page

Download the files together and open `index.html` in a browser. Keep the `images` folder in the same directory as the HTML and CSS files.

### Included controls

- First and last name in separate text fields.
- Representative ID, phone number with extension, and email text fields.
- Masked password field.
- Client email confirmation checkbox.
- All six specified transaction options.
- Submit and Reset input buttons.

Each form control has a unique ID and name. The HTML and CSS are separate files, and no CSS frameworks or HTML validation attributes are used.

### Phase 2 behavior

Submit checks first name, last name, password, representative ID, phone with extension, and email when confirmation is checked. Validation runs in JavaScript using regular expressions. An alert describes one error at a time, highlights the invalid field, and returns focus to it. Until that error is fixed, no new validation alert is issued. Reset remains available to clear the form.

After validation passes, the verification function compares all details against the same representative in a global array of 10 fictional accounts. A matching account produces a welcome alert containing the full name and selected transaction; unmatched details produce an account-not-found alert containing the full name. No form details are sent to a server.

The eye button inside the password field changes the password visibility and icon. Email is marked REQUIRED when confirmation is checked. Reset clears entries, restores the first transaction, unchecks confirmation, hides the password, and clears validation highlighting.

Names allow letters (including accented letters), with spaces, hyphens, and apostrophes between name parts. Passwords have at most 7 characters, begin with a special character, and contain an uppercase letter and a digit, with no spaces. IDs have exactly 4 digits. Phone numbers have 10 digits plus an extension introduced with `ext`, `ext.`, or `x`; extension length is 1 to 6 digits. Email requires an @, a subsequent dot, and a final domain ending of 2 to 5 letters.

Transaction choices are labels for this exercise; they do not actually book, cancel, or create anything, and the checkbox does not send email.

Use fictional details when previewing this class exercise. It is not a production login service.

### Test accounts

Names, passwords, IDs, and email addresses must match exactly. Spaces or dashes in a phone number are normalized, but the extension must match.

| First name | Last name | Password | ID | Phone and extension | Email |
| --- | --- | --- | --- | --- | --- |
| Barry | Box | `!Move1A` | 1001 | 201-555-0101 ext. 101 | barry.box@example.com |
| Maya | Reed | `@Move2B` | 1002 | 201-555-0102 ext. 102 | maya.reed@example.com |
| Leo | Cruz | `#Move3C` | 1003 | 201-555-0103 ext. 103 | leo.cruz@example.com |
| Nina | Park | `$Move4D` | 1004 | 201-555-0104 ext. 104 | nina.park@example.com |
| Owen | Hill | `%Move5E` | 1005 | 201-555-0105 ext. 105 | owen.hill@example.com |
| Ava | Stone | `&Move6F` | 1006 | 201-555-0106 ext. 106 | ava.stone@example.com |
| Eli | Brooks | `*Move7G` | 1007 | 201-555-0107 ext. 107 | eli.brooks@example.com |
| Zoe | Lane | `+Move8H` | 1008 | 201-555-0108 ext. 108 | zoe.lane@example.com |
| Noah | Wells | `?Move9J` | 1009 | 201-555-0109 ext. 109 | noah.wells@example.com |
| Isla | Hart | `!Pack0K` | 1010 | 201-555-0110 ext. 110 | isla.hart@example.com |

### Testing

52 automated logic checks passed: valid/invalid pattern boundaries, all 10 accounts, single-error alerts and focus, conditional email, account mismatches, extension mismatches, transaction welcome text, prevented form submission, and visibility/reset state. Browser checks confirmed invalid-field highlighting, a changing password icon/label, and a successful Barry Box welcome alert.

To test manually, submit an empty form, correct one error at a time, and try leaving an invalid field before fixing it. Test a valid account with and without confirmation, a valid-format wrong ID, an incorrect email when checked, all six transaction options, the eye button, and Reset.

### Submission

Your NJIT UCID is `yg432` (the part before `@njit.edu`). Your project folder is `public_html/IT202-Project1`. Upload the updated `index.html`, `styles.css`, and new `script.js` there, along with the existing `images` folder.

Your project webpage address is:

https://web.njit.edu/~yg432/IT202-Project1/index.html

Additional file URLs:

- https://web.njit.edu/~yg432/IT202-Project1/styles.css
- https://web.njit.edu/~yg432/IT202-Project1/script.js
- https://web.njit.edu/~yg432/IT202-Project1/images/MovingPhoto.avif

The HTML, CSS, and JavaScript use relative file paths, so no UCID change is needed inside them. Refresh with Ctrl+F5 after uploading the updates.

These addresses become available after uploading to NJIT; a GitHub commit does not upload the site to NJIT automatically.

Submit the files, the required file URLs, and this repository URL in Canvas as directed by the assignment.
